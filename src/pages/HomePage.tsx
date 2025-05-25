import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  // Features of the platform
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Secure Testing Environment',
      description: 'Advanced proctoring with webcam monitoring and screen sharing to ensure test integrity.',
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Time Management',
      description: 'Configurable time limits with automatic submission and randomized questions to prevent cheating.',
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Instant Grading',
      description: 'Automatic grading with detailed feedback and performance analytics for students and teachers.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: 'Diverse Question Types',
      description: 'Support for multiple-choice, true/false, short answer, essay, and matching questions with difficulty levels.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                The Secure Online Testing Platform
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Create, administer, and grade tests with advanced security features and comprehensive analytics.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="ghost" className="border border-white text-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:mt-0">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transform rotate-2">
                <img 
                  src="https://images.pexels.com/photos/5428258/pexels-photo-5428258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Student taking an online test"
                  className="w-full object-cover h-80 sm:h-96"
                />
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-400 rounded-full p-5 shadow-lg transform rotate-12">
                <span className="font-bold text-blue-900">NEW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features designed for modern education
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to create, administer, and evaluate tests with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by educators worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              See what teachers and institutions are saying about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah Johnson"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">High School Teacher</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This platform has transformed how I administer tests. The proctoring features give me confidence in the integrity of my students' results."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Michael Thompson"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Michael Thompson</h4>
                  <p className="text-gray-600">University Professor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The analytics provided by this platform have given me incredible insights into my students' understanding. I can now tailor my teaching to address specific knowledge gaps."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Emily Rodriguez"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Emily Rodriguez</h4>
                  <p className="text-gray-600">Education Director</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Implementing this platform across our institution has saved countless hours of administrative work while improving the quality and security of our assessments."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your testing experience?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of educators and institutions who trust our platform for secure and efficient online testing.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};