import React from 'react';
import classNames from 'classnames';

export interface ListProps<T> {
  dataSource?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  className?: string;
  itemLayout?: 'horizontal' | 'vertical';
}

export interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const ListItemMeta: React.FC<ListItemMetaProps> = ({ avatar, title, description, className }) => (
  <div className={classNames('flex items-start flex-1', className)}>
    {avatar && <div className="mr-4">{avatar}</div>}
    <div className="flex-1">
      {title && <div className="text-sm font-medium text-slate-800 mb-1">{title}</div>}
      {description && <div className="text-sm text-slate-500">{description}</div>}
    </div>
  </div>
);

const ListItem: React.FC<ListItemProps> & { Meta: typeof ListItemMeta } = ({ children, className, extra, actions }) => (
  <div className={classNames('flex items-center justify-between py-3 px-4 border-b border-slate-100 last:border-b-0', className)}>
    <div className="flex-1 flex items-center justify-between">
      <div className="flex-1">{children}</div>
      {actions && (
        <ul className="flex items-center m-0 p-0 list-none ml-4">
          {actions.map((action, i) => (
            <li key={i} className={classNames(i !== 0 ? 'ml-4' : '', 'flex items-center')}>
              {action}
            </li>
          ))}
        </ul>
      )}
    </div>
    {extra && <div className="ml-4 flex-shrink-0">{extra}</div>}
  </div>
);

ListItem.Meta = ListItemMeta;

const List = <T extends any>({ dataSource = [], renderItem, header, footer, bordered, className, itemLayout }: ListProps<T>) => {
  return (
    <div className={classNames('w-full', bordered ? 'border border-slate-200 rounded-lg' : '', className)}>
      {header && <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 rounded-t-lg font-medium">{header}</div>}
      <div className="w-full">
        {dataSource.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">No data</div>
        ) : (
          renderItem && dataSource.map((item, index) => renderItem(item, index))
        )}
      </div>
      {footer && <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">{footer}</div>}
    </div>
  );
};

export default Object.assign(List, { Item: ListItem });
