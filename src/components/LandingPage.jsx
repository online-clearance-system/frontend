import { useState } from "react"
import { ArrowRight, CheckCircle, Clock, Shield, Users, BookOpen, FileCheck, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("student")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  CS
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Clearance System</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Testimonials
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                FAQ
              </a>
            </nav>
            <div className="flex items-center">
              <Link to={"signup"}>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Get Started
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 leading-tight gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                <span className="">Streamlined </span>
                <span className=" text-blue-600">Clearance Process</span>
              </h2>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl">
                A modern, efficient system for managing student clearances. Track progress, submit documents, and get
                approvals - all in one place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to={"signup"}>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Start Clearance <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                </Link>
                
                <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Learn More
                </button>
              </div>
            </div>
            {/* <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Clearance System Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div> */}
          </div>
        </div>
      </section>

     

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Key Features</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our clearance system is designed to make the process efficient, transparent, and hassle-free.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-md text-blue-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Real-time Tracking</h3>
              <p className="mt-2 text-base text-gray-500">
                Monitor your clearance progress in real-time. Get instant updates when your clearance is approved or
                rejected.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-md text-green-600 mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Streamlined Approvals</h3>
              <p className="mt-2 text-base text-gray-500">
                Simplified approval process for staff members. Review and approve clearance requests with just a few
                clicks.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-md text-purple-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure & Reliable</h3>
              <p className="mt-2 text-base text-gray-500">
                Your data is secure with our robust authentication system. Access is strictly controlled based on user
                roles.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-md text-yellow-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Multi-department Support</h3>
              <p className="mt-2 text-base text-gray-500">
                Manage clearances across multiple departments. Each department has its own dashboard and approval
                workflow.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-md text-red-600 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Comprehensive Reports</h3>
              <p className="mt-2 text-base text-gray-500">
                Generate detailed reports on clearance status, department performance, and student progress.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Digital Documentation</h3>
              <p className="mt-2 text-base text-gray-500">
                Upload and manage all required documents digitally. No more paper forms or physical submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our clearance system simplifies the entire process from start to finish.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Register & Login</h3>
                  <p className="text-base text-gray-500">
                    Create an account or login with your credentials. Students use their matric number, while staff use
                    their email.
                  </p>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Submit Clearance Request</h3>
                  <p className="text-base text-gray-500">
                    Students initiate the clearance process by submitting a request. Upload any required documents for
                    verification.
                  </p>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Track & Complete</h3>
                  <p className="text-base text-gray-500">
                    Monitor your clearance progress in real-time. Receive notifications when departments approve or
                    request additional information.
                  </p>
                </div>
              </div>

              {/* Connecting line (hidden on mobile) */}
              <div
                className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-200"
                style={{ zIndex: -1 }}
              ></div>
            </div>

            <div className="mt-12 text-center">
              <Link to={"signup"}>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Start Your Clearance <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Hear from students and staff who have used our clearance system.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                    SL
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Stephen Luca</h4>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The clearance system made my graduation process so much easier. I could track everything in one place
                and didn't have to run around campus getting signatures."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                    RR
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Ronald Richards</h4>
                  <p className="text-sm text-gray-500">Head of Department</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "As a department head, this system has saved me countless hours. I can quickly review and approve
                clearance requests, and the dashboard gives me a clear overview of all pending items."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                    AO
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Ajayi Opemipo</h4>
                  <p className="text-sm text-gray-500">Electrical Engineering Student</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The notifications feature is amazing! I always knew exactly when my clearance was approved or if I
                needed to provide additional information. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Find answers to common questions about our clearance system.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">How do I start my clearance process?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Login to your student account, navigate to the dashboard, and click on "Start Clearance". Follow the
                  prompts to submit your initial request.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">What documents do I need to upload?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Required documents vary by department. The system will guide you through the specific requirements for
                  each department during the clearance process.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">How long does the clearance process take?</h3>
                <p className="mt-2 text-base text-gray-500">
                  The timeline varies depending on department workload and your responsiveness. Typically, the entire
                  process can be completed within 1-2 weeks if all documents are in order.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">What if my clearance is rejected?</h3>
                <p className="mt-2 text-base text-gray-500">
                  If your clearance is rejected, you'll receive a notification with the reason. You can address the
                  issues and resubmit your request through the system.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Can I use the system on my mobile device?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Yes, our clearance system is fully responsive and works on all devices including smartphones, tablets,
                  and desktop computers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to simplify your clearance process?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of students and staff who are already using our system.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to={"signup"}> 
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                Get Started Now
              </button>
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  CS
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold">Clearance System</h3>
                </div>
              </div>
              <p className="mt-4 text-gray-300 max-w-md">
                A modern solution for managing student clearances. Simplify the process, save time, and ensure accuracy.
              </p>
              <div className="mt-6 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Clearance System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

