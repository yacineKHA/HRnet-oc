import './modale.css';

const Modale = ({ visible, setVisibility, content }) => {
    if (!visible) return null;

    return (
        <div className="modale-container" role="dialog" aria-modal="true">
            <div className="modale-content">
                {content}
                <button className='close-container' onClick={(e) => setVisibility(false)}>
                    X
                </button>
            </div>

        </div>
    );
};

export default Modale;
