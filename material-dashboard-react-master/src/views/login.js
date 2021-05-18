import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle";
import { ContactSupportOutlined } from "@material-ui/icons";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

// core components




const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",

    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    deneme: {

    },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
    const [Name, setName] = useState()
    const [password, setpassword] = useState()
    const [Counter, setCounter] = useState(0)
    function save(event) {



        localStorage.clear()

        localStorage.setItem("username", Name);
        localStorage.setItem("pasword", password);

        setCounter(Counter + 3)
        window.location.reload()
    }
    function change1(event) {


        const value = event.target.value;
        const name = event.target.name;
        const id = event.target.id;


        if (name === "Name") {
            setName(value)

        } else if (name === "password") {
            setpassword(value)

        }
    }

    const classes = useStyles();
    return (
        <div>

            <GridContainer justify='center' alignItems="center">

                <GridItem xs={12} sm={5}>
                    <Card>
                        <GridContainer justify='center' alignItems="center">
                            <GridItem xs={12} sm={12} >

                                <CardHeader color="primary">

                                    <GridContainer justify='center' alignItems="center">
                                        <h2 className={classes.cardTitleWhite}>login</h2>
                                    </GridContainer>

                                </CardHeader>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify='center' alignItems="center">
                            <CardBody>
                                <GridContainer justify='center' alignItems="center">
                                    <GridItem xs={12} sm={6}>
                                        <form>
                                            <label>username:</label><br />
                                            <input onChange={change1} type="text" name="Name" className="form-control" ></input><br />
                                            <label>password:</label><br />
                                            <input onChange={change1} type="password" name="password" className="form-control" ></input><br />
                                        </form>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify='center' alignItems="center">
                                    <GridItem xs={12} sm={6}>
                                        <CardBody>
                                            <Button onClick={save} color="primary" round>
                                                login
                                        </Button>

                                        </CardBody>
                                    </GridItem>
                                </GridContainer>


                            </CardBody>
                        </GridContainer>


                    </Card>
                </GridItem>
            </GridContainer>


        </div>
    );
}
