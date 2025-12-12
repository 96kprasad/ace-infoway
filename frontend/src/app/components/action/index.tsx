import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import ViewIcon from '@mui/icons-material/Visibility'
import SaveIcon from '@mui/icons-material/Save'

interface ActionButtonProps {
  onClick?: () => void
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

const sizes = {
  small: 'p-1.5',
  medium: 'p-2',
  large: 'p-3'
}

const iconSizes = {
  small: { fontSize: 16 },
  medium: { fontSize: 20 },
  large: { fontSize: 24 }
}

export const AddButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Add"
    suppressHydrationWarning
  >
    <AddIcon style={iconSizes[size]} />
  </button>
)

export const EditButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Edit"
    suppressHydrationWarning
  >
    <EditIcon style={iconSizes[size]} />
  </button>
)

export const DeleteButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Delete"
    suppressHydrationWarning
  >
    <DeleteIcon style={iconSizes[size]} />
  </button>
)

export const DownloadButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Download"
    suppressHydrationWarning
  >
    <DownloadIcon style={iconSizes[size]} />
  </button>
)

export const ViewButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="View"
    suppressHydrationWarning
  >
    <ViewIcon style={iconSizes[size]} />
  </button>
)

export const SaveButton = ({ onClick, disabled, size = 'medium', className = '' }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${baseClasses} ${sizes[size]} bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Save"
    suppressHydrationWarning
  >
    <SaveIcon style={iconSizes[size]} />
  </button>
)

export default function ActionButtons() {
  return null
}