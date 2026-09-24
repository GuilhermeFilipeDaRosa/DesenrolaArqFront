import { Link, Outlet, useLocation } from 'react-router-dom'

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  Settings,
  LogOut,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Vagas',
    path: '/vagas',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Candidatos',
    path: '/candidatos',
    icon: Users,
  },
  {
    label: 'Configurações',
    path: '/configuracoes',
    icon: Settings,
  },
]

function MainLayout() {

  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-100">

      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 text-white">

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <h1 className="text-xl font-bold">
            DesenrolaArq
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6">

          <ul className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon

              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>

                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >

                    <Icon size={20} />

                    <span>
                      {item.label}
                    </span>

                  </Link>

                </li>
              )
            })}

          </ul>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">

          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={20} />

            <span>
              Sair
            </span>

          </button>

        </div>

      </aside>

      {/* Conteúdo */}
      <main className="ml-64 min-h-screen">

        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">

          <div>
            <span className="text-sm text-slate-500">
              Área administrativa
            </span>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              G
            </div>

            <div className="text-sm">
              <p className="font-medium text-slate-800">
                Guilherme
              </p>

              <p className="text-xs text-slate-500">
                Recrutador
              </p>
            </div>

          </div>

        </header>

        {/* Página atual */}
        <section className="p-6">
          <Outlet />
        </section>

      </main>

    </div>
  )
}

export default MainLayout