import * as React from "react";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

import Send from "material-ui/svg-icons/content/send";


import { fetchJSON } from "../utils/utils.js";

export class PlanListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { plans: [] };
    }

    componentWillMount() {
        fetchJSON("/api/plan/list")
            .then((plans) => {
                console.log("PlanListCard: Got plans " + JSON.stringify(plans));
                this.setState({ plans: plans });
            });
    }

    newPlan = () => {
        this.props.onNewPlan();
    }

    loadPlan = (planData) => {
        this.props.onLoadPlan(planData);
    }

    render() {
        let plans = [];
        for (let p of this.state.plans) {
            plans.push(
                <ListItem key={ p.fileName } primaryText={ p.name } rightIcon={ <Send/> }
                    onTouchTap={ () => { this.loadPlan(p.fileName); } }/>
            )
        }

        return (
            <Card>
                <CardTitle title="Plan"/>
                <CardText>
                    { (this.state.plans.length > 0) ? (<List> { plans } </List>) : <span>Keine Pläne gefunden</span> }
                </CardText>
                <CardActions>
                    <FlatButton label="Plan hochladen" disabled={true}/>
                    <FlatButton label="Neuen Plan erstellen" onTouchTap={ this.newPlan } primary={true}/>
                </CardActions>
            </Card>
        );
    }
}
