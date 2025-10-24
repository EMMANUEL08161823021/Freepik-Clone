import React from 'react'

const Footer = () => {
  return (
    <footer className="text-gray-700">
        <br/>
        <br/>
        <div className="w-full sm:max-w-xl md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-6">

            <img src={"/assets/logo.svg"} alt="logo"/>
            {/* Desktop Nav */}
            <nav
                className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 items-center"
                aria-label="Footer navigation"
            >
                <div>
                    <h3 className='text-gray-900'>Products</h3>
                    <ul className="flex flex-col gap-3 text-xs">
                    <a href="#" className="hover:text-blue-600"><li>Demos</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Assistant</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Image Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Video Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Voice Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>API</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Android</li></a>
                    <a href="#" className="hover:text-blue-600"><li>IOS</li></a>
                    <a href="#" className="hover:text-blue-600"><li>All Freepik tools</li></a>
                    </ul>
                </div>
                <div>
                    <h3 className='text-gray-900'>Get Started</h3>
                    <ul className="flex flex-col gap-3 text-xs">
                    <a href="#" className="hover:text-blue-600"><li>Pricing</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Sell Content</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Image Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Video Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Voice Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>API</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Android</li></a>
                    <a href="#" className="hover:text-blue-600"><li>IOS</li></a>
                    <a href="#" className="hover:text-blue-600"><li>All Freepik tools</li></a>
                    </ul>
                </div>
                <div>
                    <h3 className='text-gray-900'>Products</h3>
                    <ul className="flex flex-col gap-3 text-xs">
                    <a href="#" className="hover:text-blue-600"><li>Demos</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Assistant</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Image Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Video Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Voice Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>API</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Android</li></a>
                    <a href="#" className="hover:text-blue-600"><li>IOS</li></a>
                    <a href="#" className="hover:text-blue-600"><li>All Freepik tools</li></a>
                    </ul>
                </div>
                <div>
                    <h3 className='text-gray-900'>Products</h3>
                    <ul className="flex flex-col gap-3 text-xs">
                    <a href="#" className="hover:text-blue-600"><li className='list-none'>Linkedin</li></a>
                    <a href="#" className="hover:text-blue-600"><li className='list-none'>Facebook</li></a>
                    <a href="#" className="hover:text-blue-600"><li className='list-none'>Instagram</li></a>
                    <a href="#" className="hover:text-blue-600"><li className='list-none'>Twitter</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Ai Voice Generator</li></a>
                    <a href="#" className="hover:text-blue-600"><li>API</li></a>
                    <a href="#" className="hover:text-blue-600"><li>Android</li></a>
                    <a href="#" className="hover:text-blue-600"><li>IOS</li></a>
                    <a href="#" className="hover:text-blue-600"><li>All Freepik tools</li></a>
                    </ul>
                </div>
            </nav>
            {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6">            </div> */}

  
        </div>
        <br/>
        <br/>
    </footer>
  )
}

export default Footer
