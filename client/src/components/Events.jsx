import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'

const EventCard = ({ event, onRegister }) => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  
  const handleRegister = async () => {
    setRegistering(true)
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(!isRegistered)
      setRegistering(false)
      onRegister(event.id, !isRegistered)
    }, 1000)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
            <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {event.category}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">
              {event.registered} / {event.capacity}
            </div>
            <div className="text-xs text-gray-400">registered</div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">Max {event.capacity} participants</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Created by: {event.createdBy || 'Admin'}
          </div>
          
          <button
            onClick={handleRegister}
            disabled={registering || event.registered >= event.capacity}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
              isRegistered 
                ? 'bg-green-100 text-green-800 cursor-default'
                : event.registered >= event.capacity
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {registering 
              ? 'Registering...' 
              : isRegistered 
              ? 'Registered' 
              : event.registered >= event.capacity
              ? 'Full'
              : 'Register'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const Events = () => {
  // Mock data for events
  const mockEvents = [
    {
      id: 1,
      title: "Powerlifting Championship 2024",
      description: "Join us for the annual powerlifting championship featuring squat, bench press, and deadlift competitions. All skill levels welcome!",
      category: "competition",
      date: "2024-09-15T10:00:00",
      location: "Iron Paradise Gym, Downtown",
      capacity: 50,
      registered: 23,
      createdBy: "Admin"
    },
    {
      id: 2,
      title: "Beginner's Strength Training Workshop",
      description: "Learn the fundamentals of strength training with certified trainers. Perfect for those just starting their fitness journey.",
      category: "workshop",
      date: "2024-08-30T14:00:00",
      location: "FitLife Center, Northside",
      capacity: 20,
      registered: 15,
      createdBy: "Coach Mike"
    },
    {
      id: 3,
      title: "Advanced Deadlifting Techniques",
      description: "Master advanced deadlifting techniques and break through your plateaus. Includes form analysis and personalized coaching.",
      category: "training",
      date: "2024-09-05T18:00:00",
      location: "Strength Academy, West End",
      capacity: 15,
      registered: 8,
      createdBy: "Coach Sarah"
    },
    {
      id: 4,
      title: "Monthly Powerlifting Meet",
      description: "Friendly monthly competition to test your progress and meet fellow powerlifters in the community.",
      category: "powerlifting",
      date: "2024-09-20T09:00:00",
      location: "Community Rec Center",
      capacity: 30,
      registered: 18,
      createdBy: "Event Committee"
    },
    {
      id: 5,
      title: "Nutrition for Athletes Seminar",
      description: "Learn about proper nutrition strategies to fuel your training and optimize recovery. Includes meal planning tips.",
      category: "workshop",
      date: "2024-09-10T19:00:00",
      location: "Health Hub Conference Room",
      capacity: 40,
      registered: 25,
      createdBy: "Dr. Lisa"
    },
    {
      id: 6,
      title: "Youth Strength Training Program",
      description: "Safe and effective strength training program designed specifically for young athletes aged 12-17.",
      category: "training",
      date: "2024-09-25T16:00:00",
      location: "Youth Sports Complex",
      capacity: 25,
      registered: 12,
      createdBy: "Youth Coach"
    }
  ]

  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    filterEvents()
  }, [events, filter, searchTerm])

  const filterEvents = () => {
    let filtered = events

    if (filter !== 'all') {
      filtered = filtered.filter(event => event.category === filter)
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }

  const handleRegister = (eventId, isRegistering) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              registered: isRegistering 
                ? Math.min(event.registered + 1, event.capacity)
                : Math.max(event.registered - 1, 0)
            }
          : event
      )
    )
  }

  const categories = ['all', 'powerlifting', 'workshop', 'competition', 'training']

  return (
    <div id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Fitness Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and join verified fitness events in your local community
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field md:w-auto"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Check back soon for new events!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Events