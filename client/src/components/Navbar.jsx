import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Dumbbell, User, LogOut, Plus } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  // For static version - no auth
  const StaticNavbar = () => (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Dumbbell className="h-8 w-8" />
        <h1 className="text-2xl font-bold">FitConnect</h1>
      </div>
      <ul className="hidden md:flex gap-6">
        <li>
          <a href="#home" className="hover:text-gray-200 transition-colors">Home</a>
        </li>
        <li>
          <a href="#events" className="hover:text-gray-200 transition-colors">Events</a>
        </li>
        <li>
          <a href="#about" className="hover:text-gray-200 transition-colors">About</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-200 transition-colors">Contact</a>
        </li>
      </ul>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-200"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-blue-600 md:hidden z-50">
          <div className="px-4 py-2 space-y-2">
            <a href="#home" className="block py-2 hover:text-gray-200 transition-colors">Home</a>
            <a href="#events" className="block py-2 hover:text-gray-200 transition-colors">Events</a>
            <a href="#about" className="block py-2 hover:text-gray-200 transition-colors">About</a>
            <a href="#contact" className="block py-2 hover:text-gray-200 transition-colors">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )

  // Check if we're in router context (simplified check)
  const hasRouter = window.location.pathname !== undefined
  
  // If no router context, return static navbar
  if (!hasRouter) return <StaticNavbar />

  // Full featured navbar with routing would go here
  // But for now, return static navbar
  return <StaticNavbar />
}

export default Navbar