import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Trash2,
  Eye,
  Edit,
  Copy,
  Send
} from 'lucide-react';

interface Quotation {
  id: string;
  quotationNumber: string;
  customer: string;
  date: string;
  validUntil: string;
  amount: number;
  status: 'Sent' | 'Draft' | 'Confirmed' | 'Expired';
  salesperson: string;
}

interface QuotationTableProps {
  onQuotationClick?: (quotation: Quotation) => void;
  onNewQuotation?: () => void;
onViewQuotation?: (quotation: Quotation) => void;
  onEditQuotation?: (quotation: Quotation) => void;
  onDuplicateQuotation?: (quotation: Quotation) => void;
  onSendQuotation?: (quotation: Quotation) => void;
  onDeleteQuotation?: (quotation: Quotation) => void;
}

const quotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QUO-2024-001',
    customer: 'Acme Corporation',
    date: '2024-01-15',
    validUntil: '2024-02-15',
    amount: 15750,
    status: 'Sent',
    salesperson: 'John Smith'
  },
  {
    id: '2',
    quotationNumber: 'QUO-2024-002',
    customer: 'TechStart Inc.',
    date: '2024-01-14',
    validUntil: '2024-02-14',
    amount: 8900,
    status: 'Draft',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '3',
    quotationNumber: 'QUO-2024-003',
    customer: 'Global Solutions Ltd',
    date: '2024-01-13',
    validUntil: '2024-02-13',
    amount: 22300,
    status: 'Confirmed',
    salesperson: 'Mike Davis'
  },
  {
    id: '4',
    quotationNumber: 'QUO-2024-004',
    customer: 'Innovation Hub',
    date: '2024-01-12',
    validUntil: '2024-02-12',
    amount: 5600,
    status: 'Expired',
    salesperson: 'Lisa Chen'
  },
  {
    id: '5',
    quotationNumber: 'QUO-2024-005',
    customer: 'Digital Dynamics',
    date: '2024-01-11',
    validUntil: '2024-02-11',
    amount: 18500,
    status: 'Sent',
    salesperson: 'John Smith'
  },
  {
    id: '6',
    quotationNumber: 'QUO-2024-006',
    customer: 'BlueTech Industries',
    date: '2024-01-20',
    validUntil: '2024-02-20',
    amount: 34500,
    status: 'Confirmed',
    salesperson: 'Emily Rodriguez'
  },
  {
    id: '7',
    quotationNumber: 'QUO-2024-007',
    customer: 'NextGen Manufacturing',
    date: '2024-01-18',
    validUntil: '2024-02-18',
    amount: 12750,
    status: 'Sent',
    salesperson: 'David Wilson'
  },
  {
    id: '8',
    quotationNumber: 'QUO-2024-008',
    customer: 'Alpha Consulting Group',
    date: '2024-01-25',
    validUntil: '2024-02-25',
    amount: 7800,
    status: 'Draft',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '9',
    quotationNumber: 'QUO-2024-009',
    customer: 'Phoenix Energy Solutions',
    date: '2024-01-22',
    validUntil: '2024-02-22',
    amount: 45900,
    status: 'Confirmed',
    salesperson: 'Mike Davis'
  },
  {
    id: '10',
    quotationNumber: 'QUO-2024-010',
    customer: 'Metro Construction Co.',
    date: '2024-01-16',
    validUntil: '2024-02-16',
    amount: 28600,
    status: 'Sent',
    salesperson: 'Lisa Chen'
  },
  {
    id: '11',
    quotationNumber: 'QUO-2024-011',
    customer: 'Stellar Communications',
    date: '2024-01-08',
    validUntil: '2024-02-08',
    amount: 3200,
    status: 'Expired',
    salesperson: 'John Smith'
  },
  {
    id: '12',
    quotationNumber: 'QUO-2024-012',
    customer: 'GreenLeaf Logistics',
    date: '2024-01-30',
    validUntil: '2024-03-01',
    amount: 16800,
    status: 'Draft',
    salesperson: 'Emily Rodriguez'
  },
  {
    id: '13',
    quotationNumber: 'QUO-2024-013',
    customer: 'Quantum Software Labs',
    date: '2024-01-28',
    validUntil: '2024-02-28',
    amount: 52000,
    status: 'Sent',
    salesperson: 'David Wilson'
  },
  {
    id: '14',
    quotationNumber: 'QUO-2024-014',
    customer: 'Oceanic Trading Ltd',
    date: '2024-01-24',
    validUntil: '2024-02-24',
    amount: 19400,
    status: 'Confirmed',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '15',
    quotationNumber: 'QUO-2024-015',
    customer: 'Pinnacle Healthcare',
    date: '2024-01-05',
    validUntil: '2024-02-05',
    amount: 8750,
    status: 'Expired',
    salesperson: 'Mike Davis'
  },
  {
    id: '16',
    quotationNumber: 'QUO-2024-016',
    customer: 'Atlas Financial Services',
    date: '2024-02-01',
    validUntil: '2024-03-03',
    amount: 31200,
    status: 'Draft',
    salesperson: 'Lisa Chen'
  },
  {
    id: '17',
    quotationNumber: 'QUO-2024-017',
    customer: 'Crimson Media Group',
    date: '2024-01-29',
    validUntil: '2024-02-29',
    amount: 14500,
    status: 'Sent',
    salesperson: 'Emily Rodriguez'
  },
  {
    id: '18',
    quotationNumber: 'QUO-2024-018',
    customer: 'Velocity Automotive',
    date: '2024-01-26',
    validUntil: '2024-02-26',
    amount: 67800,
    status: 'Confirmed',
    salesperson: 'David Wilson'
  },
  {
    id: '19',
    quotationNumber: 'QUO-2024-019',
    customer: 'Harmony Real Estate',
    date: '2024-01-21',
    validUntil: '2024-02-21',
    amount: 24700,
    status: 'Sent',
    salesperson: 'John Smith'
  },
  {
    id: '20',
    quotationNumber: 'QUO-2024-020',
    customer: 'Silverstone Electronics',
    date: '2024-01-17',
    validUntil: '2024-02-17',
    amount: 39600,
    status: 'Confirmed',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '21',
    quotationNumber: 'QUO-2024-021',
    customer: 'Northwind Shipping',
    date: '2024-01-10',
    validUntil: '2024-02-10',
    amount: 11300,
    status: 'Expired',
    salesperson: 'Mike Davis'
  },
  {
    id: '22',
    quotationNumber: 'QUO-2024-022',
    customer: 'Titan Manufacturing',
    date: '2024-02-02',
    validUntil: '2024-03-04',
    amount: 55700,
    status: 'Draft',
    salesperson: 'Lisa Chen'
  },
  {
    id: '23',
    quotationNumber: 'QUO-2024-023',
    customer: 'Emerald Hospitality',
    date: '2024-01-31',
    validUntil: '2024-03-02',
    amount: 18900,
    status: 'Sent',
    salesperson: 'Emily Rodriguez'
  },
  {
    id: '24',
    quotationNumber: 'QUO-2024-024',
    customer: 'Vortex Technologies',
    date: '2024-01-27',
    validUntil: '2024-02-27',
    amount: 42300,
    status: 'Confirmed',
    salesperson: 'David Wilson'
  },
  {
    id: '25',
    quotationNumber: 'QUO-2024-025',
    customer: 'Apex Security Solutions',
    date: '2024-01-23',
    validUntil: '2024-02-23',
    amount: 26400,
    status: 'Sent',
    salesperson: 'John Smith'
  },
  {
    id: '26',
    quotationNumber: 'QUO-2024-026',
    customer: 'Diamond Retail Chain',
    date: '2024-01-19',
    validUntil: '2024-02-19',
    amount: 33800,
    status: 'Confirmed',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '27',
    quotationNumber: 'QUO-2024-027',
    customer: 'Summit Consulting',
    date: '2024-01-09',
    validUntil: '2024-02-09',
    amount: 4800,
    status: 'Expired',
    salesperson: 'Mike Davis'
  },
  {
    id: '28',
    quotationNumber: 'QUO-2024-028',
    customer: 'Cascade Water Systems',
    date: '2024-02-03',
    validUntil: '2024-03-05',
    amount: 21600,
    status: 'Draft',
    salesperson: 'Lisa Chen'
  },
  {
    id: '29',
    quotationNumber: 'QUO-2024-029',
    customer: 'Prism Design Studio',
    date: '2024-02-01',
    validUntil: '2024-03-03',
    amount: 9700,
    status: 'Sent',
    salesperson: 'Emily Rodriguez'
  },
  {
    id: '30',
    quotationNumber: 'QUO-2024-030',
    customer: 'Zenith Pharmaceuticals',
    date: '2024-01-25',
    validUntil: '2024-02-25',
    amount: 73500,
    status: 'Confirmed',
    salesperson: 'David Wilson'
  }
];



const QuotationTable: React.FC<QuotationTableProps> = ({ 
  onQuotationClick=(quotation)=>{quotation},
  onNewQuotation=()=>{},
onViewQuotation,
  onEditQuotation,
  onDuplicateQuotation,
  onSendQuotation,
  onDeleteQuotation
}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const totalQuotations = quotations.length;
    const totalValue = quotations.reduce((sum, q) => sum + q.amount, 0);
    const confirmedValue = quotations
      .filter(q => q.status === 'Confirmed')
      .reduce((sum, q) => sum + q.amount, 0);
    const conversionRate = totalQuotations > 0 
      ? Math.round((quotations.filter(q => q.status === 'Confirmed').length / totalQuotations) * 100)
      : 0;

    return {
      totalQuotations,
      totalValue,
      confirmedValue,
      conversionRate
    };
  }, [quotations]);

  useEffect(()=>{
    fetch('/api/quotations/')
  })

  // Filter quotations based on search and status
  const filteredQuotations = useMemo(() => {
    return quotations.filter(quotation => {
      const matchesSearch = searchTerm === '' || 
        quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.salesperson.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || quotation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [quotations, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleActionClick = (e: React.MouseEvent, quotationId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === quotationId ? null : quotationId);
  };

  const handleActionSelect = (action: string, quotation: Quotation) => {
    setActiveDropdown(null);
    
    switch (action) {
      case 'view':
        onViewQuotation?.(quotation);
        break;
      case 'edit':
        onEditQuotation?.(quotation);
        break;
      case 'duplicate':
        onDuplicateQuotation?.(quotation);
        break;
      case 'send':
        onSendQuotation?.(quotation);
        break;
      case 'delete':
        onDeleteQuotation?.(quotation);
        break;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
            <p className="text-gray-600">Manage your customer quotations</p>
          </div>
          <button
            onClick={onNewQuotation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <span className="text-lg">+</span>
            <span>New Quotation</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quotations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalQuotations}</p>
              <p className="text-sm text-gray-500">Active quotations</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
              <p className="text-sm text-gray-500">All quotations</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.confirmedValue)}</p>
              <p className="text-sm text-gray-500">Confirmed value</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              <p className="text-sm text-gray-500">Quote to sale</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Quotations</h2>
              <p className="text-sm text-gray-600">Manage and track your customer quotations</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Sent">Sent</option>
                <option value="Draft">Draft</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Expired">Expired</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
                <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quotation #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation) => (
                <tr 
                  key={quotation.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onQuotationClick && onQuotationClick(quotation)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quotation.quotationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quotation.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(quotation.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(quotation.validUntil)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                      {quotation.status}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 relative">
                    <button 
                      className="hover:text-gray-600 transition-colors p-1 rounded"
                      onClick={(e) => handleActionClick(e, quotation.id)}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    Actions Dropdown
                    {activeDropdown === quotation.id && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                          Actions
                        </div>
                        <button
                          onClick={() => handleActionSelect('view', quotation)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleActionSelect('edit', quotation)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleActionSelect('duplicate', quotation)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={() => handleActionSelect('send', quotation)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send to Customer</span>
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => handleActionSelect('delete', quotation)}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredQuotations.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first quotation'
              }
            </p>
            {(!searchTerm && statusFilter === 'All') && (
              <button
                onClick={onNewQuotation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create New Quotation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Sample data for demonstration
export const sampleQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QUO-2024-001',
    customer: 'Acme Corporation',
    date: '2024-01-15',
    validUntil: '2024-02-15',
    amount: 15750,
    status: 'Sent',
    salesperson: 'John Smith'
  },
  {
    id: '2',
    quotationNumber: 'QUO-2024-002',
    customer: 'TechStart Inc.',
    date: '2024-01-14',
    validUntil: '2024-02-14',
    amount: 8900,
    status: 'Draft',
    salesperson: 'Sarah Johnson'
  },
  {
    id: '3',
    quotationNumber: 'QUO-2024-003',
    customer: 'Global Solutions Ltd',
    date: '2024-01-13',
    validUntil: '2024-02-13',
    amount: 22300,
    status: 'Confirmed',
    salesperson: 'Mike Davis'
  },
  {
    id: '4',
    quotationNumber: 'QUO-2024-004',
    customer: 'Innovation Hub',
    date: '2024-01-12',
    validUntil: '2024-02-12',
    amount: 5600,
    status: 'Expired',
    salesperson: 'Lisa Chen'
  },
  {
    id: '5',
    quotationNumber: 'QUO-2024-005',
    customer: 'Digital Dynamics',
    date: '2024-01-11',
    validUntil: '2024-02-11',
    amount: 18500,
    status: 'Sent',
    salesperson: 'John Smith'
  }
];

export default QuotationTable;