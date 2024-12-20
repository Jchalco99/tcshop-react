import AdminHeaderComponent from "@/components/admin/AdminHeaderComponent"
import AdminSidebarComponent from "@/components/admin/AdminSidebarComponent"
import { useState } from "react"

function LayoutAdmin({ children, showSidebar = true }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
    return (
      <div className="min-h-screen bg-background">
        <AdminHeaderComponent onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {showSidebar && <AdminSidebarComponent isOpen={isSidebarOpen} />}
        <main className={`pt-16 transition-all duration-200 ease-in-out ${showSidebar ? (isSidebarOpen ? 'ml-64' : 'ml-16') : ''}`}>
          {children}
        </main>
      </div>
    )
  }

  export default LayoutAdmin