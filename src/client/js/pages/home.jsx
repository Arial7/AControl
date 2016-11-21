define([ "react", "react-dom", "react-mdl", "react-router", "views/connectionCard" ],
    function(React, ReactDOM, MDL, Router, ConnectionCard ) {

    const { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem, IconButton,
        ListItemContent, ListItemAction, Tooltip } = MDL;

    class Home extends React.Component {
        constructor(props) {
            super(props);
        }

        newPlan() {
            Router.hashHistory.push("/editor/neu");
        }

        render() {
            return (
                <Grid>
                    <Cell col={6}>
                        <ConnectionCard />
                    </Cell>
                    <Cell col={6}>
                        <Card shadow={1}>
                            <CardTitle>Plan</CardTitle>
                            <CardText>
                                <List>
                                    <ListItem>
                                        <ListItemContent>MEK_V1.acp</ListItemContent>
                                        <ListItemAction>
                                            <Tooltip label="Plan laden">
                                                <IconButton name="send" colored/>
                                            </Tooltip>
                                        </ListItemAction>
                                    </ListItem>
                                </List>
                            </CardText>
                            <CardActions border>
                                <Button colored>Plan hochladen</Button>
                                <Button onClick={ this.newPlan } colored>Neuen Plan erstellen</Button>
                            </CardActions>
                        </Card>
                    </Cell>
                </Grid>
            );
        }

    };

    return Home;

});
