# School Library Management System

A complete, professional frontend for a Ugandan secondary school library management system built with React.js and TailwindCSS.

## Features

### Core Functionality
- **Dashboard**: Real-time statistics and quick actions
- **Authentication**: Secure login with role-based access
- **Book Management**: Catalog management with search and filters
- **Circulation**: Check-out, return, and renewal processes
- **User Management**: Student and teacher profiles
- **Reports**: Overdue books, popular titles, and usage analytics
- **Settings**: System configuration and audit logs

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline Support**: Local storage for offline viewing
- **Mock API**: Ready for backend integration
- **Accessibility**: High contrast, keyboard navigation
- **Professional UI**: Clean, intuitive interface

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Login
- **Email**: admin@school.ug
- **Password**: password

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── books/           # Book management components
│   ├── circulation/     # Circulation components
│   ├── users/           # User management components
│   ├── reports/         # Reporting components
│   └── settings/        # Settings components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services and mock data
├── context/             # React Context providers
├── utils/               # Utility functions
└── assets/              # Static assets
```

## Technology Stack

- **Frontend Framework**: React.js 18
- **Styling**: TailwindCSS 3
- **Routing**: React Router DOM 6
- **State Management**: React Context API + useReducer
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Mock Data

The application uses mock data for demonstration purposes. All API calls are simulated with realistic delays and responses. The mock data includes:

- Sample books from Ugandan curriculum
- Student and teacher profiles
- Transaction history
- Dashboard statistics

## Customization

### Styling
- Colors and themes can be customized in `tailwind.config.js`
- Custom CSS classes are defined in `src/index.css`

### Mock Data
- Update mock data in `src/services/api.js`
- Add new mock endpoints as needed

### Features
- Components are modular and can be easily extended
- New pages can be added by creating components in `src/pages/`
- Navigation is configured in `src/utils/constants.js`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## API Integration

To connect to a real backend:

1. Update the `API_BASE_URL` in `src/services/api.js`
2. Replace mock functions with real API calls
3. Update authentication flow in `src/context/AuthContext.js`
4. Configure CORS on your backend server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.