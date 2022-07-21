const links = [
    {
      "link": "/login",
      "label": "Login",
      "role" : ['guest']
    },
    {
      "link": "/profile",
      "label": "Profile",
      'role': ['user', 'admin']
    },
    {
      "link": "/polls",
      "label": "Polls List",
      'role': ['user','admin']
    },
    {
      "link": "/admin",
      "label": "Admin",
      'role': ['admin']
    },
  ]

const API_URL = "http://localhost:8000/api"
const BASE_URL =  "http://localhost:8000"
  export {
    links,
    API_URL,
    BASE_URL
  }