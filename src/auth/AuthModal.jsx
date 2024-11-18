import PropTypes from 'prop-types';
import { FaSmile, FaTimes } from 'react-icons/fa';

const AuthModal = ({ onClose }) => {
    return (
        <div role="alert" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div role="alert" className="w-96 bg-white rounded-lg overflow-hidden shadow-lg"> {/* Added shadow for depth */}
                <div className="bg-green-800 text-white text-lg font-bold rounded-t px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Alert icon added here */}
                        <FaSmile className="text-xl" />
                        Notification
                    </div>
                    {/* Close icon added here, positioned to the right */}
                    <FaTimes className="cursor-pointer" onClick={onClose} />
                </div>
                <div className="px-4 py-3 text-black flex-wrap">
                    <p className="font-semibold">
                        This is a notification or information modal. Customize the content as needed.
                    </p>
                </div>
                {/* Optional additional button or content */}
                <div className="px-4 py-4 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Define prop types for AuthModal
AuthModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AuthModal;
