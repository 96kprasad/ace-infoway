'use client'
import { SVGIcons } from '../../../../utils/svgConstants'

export default function StatsCards({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status.toLowerCase() === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status.toLowerCase() === 'in progress').length
  const todoTasks = tasks.filter(t => t.status.toLowerCase() === 'to do').length

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      bgColor: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100',
      icon: <SVGIcons.Tasks className="w-6 h-6" />
    },
    {
      title: 'Completed',
      value: completedTasks,
      bgColor: 'from-green-500 to-green-600',
      textColor: 'text-green-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      bgColor: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'To Do',
      value: todoTasks,
      bgColor: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${stat.textColor} text-sm font-medium`}>{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}