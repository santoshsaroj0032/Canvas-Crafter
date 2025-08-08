# 🎨 Canvas Editor - Interactive 2D Drawing Application

A modern, feature-rich 2D canvas editor built with **Next.js 14**, **TypeScript**, and **HTML5 Canvas**. Create, edit, and share drawings with real-time collaboration capabilities and intuitive object manipulation.

![Canvas Editor Demo](https://via.placeholder.com/800x400/f3f4f6/1f2937?text=Canvas+Editor+Demo)

## 🚀 Live Demo

**[Try it live →](https://your-canvas-editor.vercel.app)**

## ✨ Key Features

### 🎯 **Core Drawing Tools**
- **✏️ Freehand Drawing** - Smooth pen tool with customizable stroke
- **🟦 Shape Tools** - Rectangle and circle creation
- **📝 Text Tool** - Editable text with font customization
- **🖱️ Selection Tool** - Click to select and manipulate objects

### 🔧 **Advanced Object Manipulation**
- **📱 Drag & Drop** - Intuitive object movement
- **📏 Resize Handles** - Visual corner handles for resizing
- **🔄 Rotation** - 360° object rotation capability
- **🗑️ Delete Objects** - Easy object removal

### 🎨 **Rich Customization**
- **🌈 Color Picker** - Full color customization for fill and stroke
- **📏 Stroke Width** - Adjustable line thickness (1-20px)
- **🔤 Typography** - Font size control (8-72px)
- **⚡ Real-time Updates** - Instant property changes

### 🔗 **Sharing & Export**
- **📤 PNG Export** - High-quality image download
- **🔗 Shareable Links** - Instant link sharing
- **💾 Auto-save** - Automatic canvas state preservation
- **📱 Responsive Design** - Works on all devices

## 🛠️ Technical Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 14** | React Framework | App Router, SSR, Performance |
| **TypeScript** | Type Safety | Better DX, Fewer Bugs |
| **HTML5 Canvas** | Drawing Engine | Native Performance, No Dependencies |
| **Tailwind CSS** | Styling | Rapid UI Development |
| **Lucide React** | Icons | Consistent Icon System |
| **Radix UI** | Components | Accessible UI Primitives |

## 🏗️ Architecture Highlights

### **Clean Architecture**
```
├── app/                    # Next.js App Router
│   ├── canvas/[id]/       # Dynamic canvas routes
│   └── page.tsx           # Home page with auto-redirect
├── components/            # Reusable UI components
│   ├── simple-canvas.tsx  # Main canvas component
│   └── ui/               # Shadcn/ui components
└── lib/                  # Utilities and helpers
    └── utils.ts          # Common utility functions
```

### **State Management**
- **React Hooks** for local state management
- **Custom object system** with unique IDs
- **Efficient re-rendering** with useCallback optimization
- **Real-time canvas updates** without external libraries

### **Performance Optimizations**
- **Canvas-based rendering** for smooth 60fps drawing
- **Debounced operations** for optimal performance
- **Minimal re-renders** with React optimization patterns
- **Lightweight bundle** with selective imports

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/canvas-editor.git
cd canvas craft

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Usage Guide

### **Basic Drawing**
1. Select the **Draw** tool from the toolbar
2. Click and drag on the canvas to draw freehand
3. Switch to **Select** tool to manipulate objects

### **Adding Shapes**
1. Click **Rectangle** or **Circle** buttons
2. Objects appear with selection handles
3. Drag handles to resize, drag object to move

### **Text Editing**
1. Click **Text** button to add text
2. Select text and click **Edit Text** button
3. Type new content and click **Save**

### **Customization**
1. Select any object to see properties panel
2. Use color pickers for fill/stroke colors
3. Adjust stroke width and font size
4. Click **Rotate** for 15° increments

### **Sharing & Export**
1. Click **Share** to copy shareable link
2. Click **Export PNG** to download image
3. Use **Clear** to reset canvas
   
## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
