import React, { createContext, useContext, forwardRef } from 'react';
import classNames from 'classnames';

// Simple Form Context to handle layout direction
const FormContext = createContext<{ layout?: 'horizontal' | 'vertical' | 'inline' }>({ layout: 'vertical' });

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  form?: any; // We'll just pass this through or ignore it for basic HTML forms
  layout?: 'horizontal' | 'vertical' | 'inline';
  onFinish?: (values: any) => void;
  initialValues?: any;
  requiredMark?: boolean | 'optional';
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, layout = 'vertical', onFinish, initialValues, requiredMark, className, onSubmit, ...rest }, ref) => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (onSubmit) onSubmit(e);
      if (onFinish) {
        const formData = new FormData(e.currentTarget);
        const values: Record<string, any> = {};
        formData.forEach((value, key) => {
          values[key] = value;
        });
        // Very basic initialValues merge for unmanaged inputs
        const mergedValues = { ...initialValues, ...values };
        onFinish(mergedValues);
      }
    };

    return (
      <FormContext.Provider value={{ layout }}>
        <form
          ref={ref}
          className={classNames(
            'w-full',
            layout === 'inline' ? 'flex flex-wrap items-center gap-4' : '',
            className
          )}
          onSubmit={handleSubmit}
          {...rest}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  name?: string;
  rules?: any[];
  required?: boolean;
}

const Item: React.FC<FormItemProps> = ({ children, label, name, rules, required, className, ...rest }) => {
  const { layout } = useContext(FormContext);
  const isRequired = required || (rules && rules.some((r) => r.required));

  return (
    <div
      className={classNames(
        'mb-6',
        layout === 'horizontal' ? 'flex items-start' : 'flex flex-col',
        className
      )}
      {...rest}
    >
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            'text-sm font-bold text-slate-800 mb-2',
            layout === 'horizontal' ? 'w-1/3 text-right pr-4 pt-2' : ''
          )}
        >
          {isRequired && <span className="text-red-500 mr-1">*</span>}
          {label}
        </label>
      )}
      <div className={layout === 'horizontal' ? 'w-2/3' : 'w-full'}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Inject name and id
            return React.cloneElement(child as any, { name, id: name });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export const useForm = () => {
  // Mock antd useForm to prevent crashes during migration
  return [{ 
    setFieldsValue: (values: any) => {}, 
    getFieldsValue: (nameList?: any) => ({}), 
    validateFields: async () => ({}),
    resetFields: () => {}
  }];
};

(Form as any).Item = Item;
(Form as any).useForm = useForm;

export default Form as React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>> & {
  Item: typeof Item;
  useForm: typeof useForm;
};
