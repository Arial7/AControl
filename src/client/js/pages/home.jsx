define([ "react", "react-dom", "react-mdl", "views/connectionCard", "views/basicCard" ],
    function(React, ReactDOM, MDL, ConnectionCard, BasicCard) {

    const { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem, IconButton,
        ListItemContent, ListItemAction } = MDL;

    class Home extends React.Component {
        constructor(props) {
            super(props);
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
                                        <ListItemAction><IconButton name="send" colored/></ListItemAction>
                                    </ListItem>
                                </List>
                            </CardText>
                            <CardActions border>
                                <Button colored>Plan hochladen</Button>
                            </CardActions>
                        </Card>
                    </Cell>
                </Grid>
            );
        }

    };

    return Home;

});
