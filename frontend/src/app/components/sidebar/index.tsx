'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVGIcons } from '../../../../utils/svgConstants'

export default function Sidebar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <aside className="sidebar-fixed border-r bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-xl text-red-500 font-bold mb-8">ACE Infoway</h2>
        <nav className="space-y-2">
          <Link 
            href="/dashboard"
            className={`w-full flex font-semibold items-center px-4 py-2 rounded-lg ${
              isActive('/dashboard') ? 'bg-red-500' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <SVGIcons.Dashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
        </nav>
      </div>
    </aside>
  )
}