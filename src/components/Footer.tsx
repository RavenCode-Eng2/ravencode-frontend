import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1d23] border-t border-[#283039] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Mobile-first simplified layout */}
        <div className="block md:hidden">
          {/* Mobile Layout */}
          <div className="text-center mb-6">
            <h3 className="text-white text-lg font-semibold mb-2">RavenCode</h3>
            <p className="text-gray-400 text-sm mb-4">
              Plataforma de aprendizaje de programación interactiva
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
              Dashboard
            </Link>
            <Link to="/courses" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cursos
            </Link>
            <Link to="/my-courses" className="text-gray-400 hover:text-white text-sm transition-colors">
              Mis Cursos
            </Link>
            <Link to="/achievements" className="text-gray-400 hover:text-white text-sm transition-colors">
              Logros
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-3">
              © {currentYear} RavenCode. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs mb-4">
              Desarrollado con ❤️ por estudiantes de la Universidad Nacional de Colombia 🇨🇴
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h3 className="text-white text-lg font-semibold mb-4">RavenCode</h3>
              <p className="text-gray-400 text-sm mb-4">
                Plataforma de aprendizaje de programación interactiva. 
                Aprende a programar paso a paso con ejercicios prácticos y proyectos reales.
              </p>
              <p className="text-gray-500 text-xs">
                © {currentYear} RavenCode. Todos los derechos reservados.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link to="/my-courses" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Mis Cursos
                  </Link>
                </li>
                <li>
                  <Link to="/achievements" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Logros
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Términos de Servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#283039] mt-8 pt-6 flex flex-row justify-between items-center">
            <p className="text-gray-500 text-xs">
              Desarrollado con ❤️ por estudiantes de la Universidad Nacional de Colombia 🇨🇴
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 