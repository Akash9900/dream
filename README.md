# Fantasy Sports App

A comprehensive fantasy sports mobile application built with React Native and Expo, supporting multiple sports including Football (NFL), Baseball, Basketball, and Ice Hockey.

## Features

- Multi-sport fantasy contests
- User authentication system
- Create and join contests
- Build custom teams
- Track live scores and performance
- Dark/Light theme support
- Profile management

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v20.18.2 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development (macOS only):
  - [Xcode](https://apps.apple.com/us/app/xcode/id497799835)
  - iOS Simulator
- For Android development:
  - [Android Studio](https://developer.android.com/studio)
  - Android SDK
  - Android Virtual Device (AVD)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Akash9900/dream.git
cd fantasy-sports-app
```

2. Install dependencies:

```bash
npm install
```

3. Install Expo CLI globally (if not already installed):

```bash
npm install -g expo-cli
```

## Running the App

1. Start the development server:

```bash
npx expo start
```

2. Choose how to run the app:

- **Physical Device**:
  - Install Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
  - Scan the QR code with:
    - iOS: Camera app
    - Android: Expo Go app
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Web Browser**: Press `w` in the terminal

## Project Structure

```
.
├── src/
│   ├── api/         # API integration
│   ├── assets/      # Static assets
│   ├── components/  # Reusable UI components
│   ├── config/      # Configuration files
│   ├── context/     # React Context providers
│   ├── models/      # Data models
│   ├── routes/      # Navigation/routing
│   ├── screens/     # Main application screens
│   ├── services/    # Business logic services
│   └── utils/       # Utility functions
├── App.js          # Main application entry point
└── package.json    # Project dependencies
```

## Dependencies

Key dependencies include:

- @expo/vector-icons: ^14.1.0
- @react-navigation/native: ^7.1.8
- @react-navigation/stack: ^7.3.1
- @react-navigation/bottom-tabs: ^7.3.12
- axios: ^1.9.0
- react: ^19.0.0
- react-native-gesture-handler: ^2.25.0
- react-native-reanimated: ^3.17.5

## Available Screens

- Home Screen: Browse available contests
- Contest Details: View specific contest information
- Create Team: Build your fantasy team
- My Contests: Track your active contests
- Profile: Manage your account settings

## Theme Support

The app supports both light and dark themes, which can be toggled through the profile settings. The theme system is built using React Context for consistent styling across the application.

## Development

For the best development experience, we recommend:

- VS Code with React Native extensions
- ESLint for code linting
- Prettier for code formatting
- React Native Debugger for debugging

## Troubleshooting

If you encounter the package compatibility warning:

```
react-native-gesture-handler@2.25.0 - expected version: ~2.24.0
```

Run:

```bash
npm install react-native-gesture-handler@2.24.0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
