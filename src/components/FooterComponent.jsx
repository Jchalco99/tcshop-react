function FooterComponent() {
  return (
    <footer className="bg-[#1f293a] py-6 text-white mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
          <div className="text-center">
            <h3 className="mb-4 text-lg font-bold">
              T&C Shop es una pagina enfocada a la recoleccion de fondos para la
              semana del T&C Week
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-800 text-center text-sm text-gray-400">
          © 2024 T&C Shop. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
