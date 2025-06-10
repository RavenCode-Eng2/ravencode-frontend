import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { theme } from '../theme';

const NotFound = () => {
    return (
        <div className={`min-h-screen bg-[${theme.colors.background.main}] flex flex-col justify-center items-center px-6 py-12`}>
            <div className="text-center">
                <div className="flex justify-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-[${theme.colors.background.tertiary}] flex items-center justify-center`}>
                        <div className={`w-8 h-8 text-[${theme.colors.primary.main}]`}>
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className={`text-9xl font-bold text-[${theme.colors.primary.main}]`}>404</h1>
                <h2 className={`mt-4 text-3xl font-semibold text-[${theme.colors.text.primary}]`}>Page not found</h2>
                <p className={`mt-4 text-lg text-[${theme.colors.text.secondary}]`}>Sorry, we couldn't find the page you're looking for.</p>
                <div className="mt-8">
                    <Button to="/" size="lg">
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 