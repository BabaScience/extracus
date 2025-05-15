# Extracus

Extracus is a modern web application for transcribing audio and video files. Built with React, TypeScript, and Vite, it provides a seamless user experience for uploading and processing media files.

## Features

- 🎯 Modern React with TypeScript
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Responsive design
- 🚀 Fast development with Vite
- 🎵 Audio/Video file upload support
- 🔒 Secure file handling
- 📊 Progress tracking
- 🎯 Chunked uploads for large files

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/extracus.git
   cd extracus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start the backend server (for file uploads)

## Project Structure

```
extracus/
├── src/
│   ├── components/     # React components
│   ├── server/        # Backend server code
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
└── vite.config.ts     # Vite configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3000
TEMP_STORAGE_PATH=/tmp/extracus
MAX_FILE_SIZE=500000000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/) 