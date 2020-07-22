export default ({
    onModeChange,
    mode,
    searchStr,
    setSearchStr,
    searchFilter,
    setSearchFilter,
    onSearch,
}) => {
    return (
        <>
            <div className="bar-wrapper">
                <div className="form-inline">
                    <div className="form-group">
                        <div className="switch-wrapper">
                            <span>Search mode</span>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitch1"
                                    onChange={onModeChange}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch1"
                                ></label>
                            </div>
                        </div>
                    </div>
                    {mode === "search" && (
                        <div className="form-group mx-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Seach by ${searchFilter} ...`}
                                onChange={(e) => setSearchStr(e.target.value)}
                                value={searchStr}
                            />
                            <select
                                onChange={(e) => setSearchFilter(e.target.value)}
                                className="form-control"
                                value={searchFilter}
                            >
                                <option>name</option>
                                <option>email</option>
                            </select>
                            <button onClick={onSearch} className="btn btn-primary">
                                Search
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>
                {`
                    .bar-wrapper {
                        width: 100%;
                        padding: 10px;

                        background-color: grey;
                    }
                    .switch-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .switch-wrapper span {
                        padding: 10px 5px;
                    }
                `}
            </style>
        </>
    );
};
