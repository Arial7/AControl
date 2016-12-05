import * as React from "react";
import { hashHistory } from "react-router";

import { Grid, Row, Col } from "react-flexbox-grid/lib/index";

import { ConnectionCard } from "./connectionCard.jsx";
import { PlanListCard } from "./planListCard.jsx";

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    newPlan = () => {
        hashHistory.push("/editor/neu");
    }

    loadPlan = (planData) => {
        hashHistory.push(`/plan/${planData}`)
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6}>
                        <ConnectionCard />
                    </Col>
                    <Col xs={6}>
                        <PlanListCard onNewPlan={ this.newPlan } onLoadPlan= { this.loadPlan } />
                    </Col>
                </Row>
            </Grid>
        );
    }

};
