/**
 * Frappe API Hooks - Re-exports from frappe-react-sdk
 * 
 * All Frappe interactions should use these hooks:
 * - useFrappeGetCall: Call whitelisted Python methods
 * - useFrappeGetDoc: Get single document
 * - useFrappeGetDocList: Get list of documents
 * - useFrappeCreateDoc: Create document
 * - useFrappeUpdateDoc: Update document
 * - useFrappeDeleteDoc: Delete document
 * - useFrappeAuth: Authentication (login/logout)
 * 
 * @example
 * ```tsx
 * import { useFrappeGetCall, useFrappeGetDocList } from 'frappe-react-sdk';
 * 
 * // Call API method
 * const { data, error, isLoading, call } = useFrappeGetCall('lmpharma.api.get_products');
 * call({ category: 'medicine' });
 * 
 * // Get documents
 * const { data, error, isLoading } = useFrappeGetDocList('Product', {
 *   fields: ['name', 'product_name'],
 *   filters: [['status', '=', 'Active']],
 *   limit: 20
 * });
 * ```
 */

export {
  useFrappeGetCall,
  useFrappeGetDoc,
  useFrappeGetDocList,
  useFrappeCreateDoc,
  useFrappeUpdateDoc,
  useFrappeDeleteDoc,
  useFrappeAuth,
  FrappeProvider,
} from 'frappe-react-sdk';
