export default ({onLoadMore}) => {
    return (
        <>
            <div className="button-wrapper">
                <button onClick={onLoadMore}>
                    <img src="/static/plus-circle-solid.svg" />
                </button>
            </div>
            <style jsx>{`
                .button-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    padding: 15px;
                }
                .button-wrapper button {
                    padding: 0px;
                    background: none;
                    border: none;
                }
                .button-wrapper img {
                    height: 34px;
                    width: 34px;
                }
            `}</style>
        </>
    );
};
