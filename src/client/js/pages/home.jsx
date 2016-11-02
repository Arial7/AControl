define([ "react", "react-dom", "views/column", "views/connectionCard", "views/basicCard" ],
    function(React, ReactDOM, Column, ConnectionCard, BasicCard) {
        return function(props) {
            return (
                <div className="mdl-grid">
                    <Column width="3">
                        <h2>Willkommen bei AControl!</h2>
                    </Column>
                    <Column width="4">
                        <ConnectionCard />
                    </Column>
                    <Column width="5">
                        <BasicCard title="Plan" elevation="2">
                            <button>Plan hochladen</button>
                            <button>Bestehenden Plan auswählen</button>
                            <button>Plan herunterladen</button>
                        </BasicCard>
                    </Column>
                </div>
            );
        }
});
