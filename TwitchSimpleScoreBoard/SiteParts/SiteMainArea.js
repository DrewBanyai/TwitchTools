class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { PlayerContainers: {}, PlayerNameTags: {}, PlayerScoreLabels: {}, PlayerScores: {} };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: { width: "1280px", height: "720px" }, })
        let centeredMainArea = new Container({ id: "CenteredMainArea", style: { margin: "auto", width: "100%", height: "100%", overflow: "hidden", display: "flex" }, })
        container.appendChild(centeredMainArea.content);

        //  Create all player containers
        for (let i = 0; i < SETTINGS.PLAYERS.length; ++i) this.createPlayerContainer(i, centeredMainArea)

        this.setOnChatMessage();

        return container.content;
    }

    createPlayerContainer(playerIndex, container) {
        //  Get the width of the player container
        var playerContainerWidth = parseInt(100.0 / SETTINGS.PLAYERS.length);

        //  Create the container and append it to the parent container
        let playerContainer = new Container({
            id: "PlayerContainer_" + (playerIndex + 1).toString(),
            style: {
                width: playerContainerWidth.toString() + "%",
                height: "100%",
                alignText: "center",
                paddingTop: "30px",
                textAlign: "center"
            }
        })
        container.appendChild(playerContainer.content);

        let innerContainer = new Container({
            id: "InnerContainer_" + (playerIndex + 1).toString(),
            style: {
                width: "200px",
                height: "100px",
                borderRadius: "6px",
                backgroundColor: SETTINGS.STYLE.NAME_TAG_INNER_CONTAINER_COLOR,
                margin: "auto"
            }
        })
        playerContainer.appendChild(innerContainer.content);

        //  Create the name tag for this player container
        let nameTag = new Label({
            id: "NameTag_" + (playerIndex + 1).toString(),
            style: {
                width: "100%",
                height: "40px",
                fontFamily: SETTINGS.STYLE.NAME_TAG_FONT_FAMILY,
                fontSize: SETTINGS.STYLE.NAME_TAG_FONT_SIZE,
                fontWeight: SETTINGS.STYLE.NAME_TAG_FONT_WEIGHT,
                color: SETTINGS.STYLE.NAME_TAG_COLOR
            },
            attributes: {
                value: SETTINGS.PLAYERS[playerIndex]
            }
        })
        innerContainer.appendChild(nameTag.content);

        //  Create the score label for this player container
        let scoreLabel = new Label({
            id: "ScoreLabel_" + (playerIndex + 1).toString(),
            style: {
                width: "100%",
                height: "40px",
                fontFamily: SETTINGS.STYLE.SCORE_LABEL_FONT_FAMILY,
                fontSize: SETTINGS.STYLE.SCORE_LABEL_FONT_SIZE,
                fontWeight: SETTINGS.STYLE.SCORE_LABEL_FONT_WEIGHT,
                color: SETTINGS.STYLE.SCORE_LABEL_COLOR
            },
            attributes: {
                value: "0"
            }
        })
        innerContainer.appendChild(scoreLabel.content);

        //  Assign the class elements for this container
        let playerLowercase = SETTINGS.PLAYERS[playerIndex].toLowerCase();
        this.elements.PlayerContainers[playerLowercase] = playerContainer.content;
        this.elements.PlayerNameTags[playerLowercase] = nameTag.content;
        this.elements.PlayerScoreLabels[playerLowercase] = scoreLabel.content;
        this.elements.PlayerScores[playerLowercase] = 0;

        //  Return the player container in case we need to do anything with it back in the main function
        return playerContainer;
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
            if (!message || !message.username || !message.message || !message.tags) { return false }
            let messageUser = message.username;
            let messageText = message.message;

            let controllersLowerCase = []
            for (let i = 0; i < SETTINGS.CONTROLLERS.length; ++i) controllersLowerCase.push(SETTINGS.CONTROLLERS[i].toLowerCase())

            if (!controllersLowerCase.includes(messageUser)) { return false }
            if (messageUser === username) { return false }
            if (messageText.length < 2) { return false }
            if (messageText[0] !== '!') { return false }

            let playersLowerCase = []
            for (let i = 0; i < SETTINGS.PLAYERS.length; ++i) playersLowerCase.push(SETTINGS.PLAYERS[i].toLowerCase())

            let messageParts = message.message.split(' ')
            switch (messageParts[0]) {
                case "!setscore":
                    {
                        //  Proper form is "!setscore USERNAME SCORE"
                        if (messageParts.length !== 3) { return false }
                        
                        //  If the second part is not a valid player, fail out
                        let playerLowercase = messageParts[1].toLowerCase()
                        if (!playersLowerCase.includes(playerLowercase)) { return false }

                        //  if the third part is not a valid integer, fail out
                        if (parseInt(messageParts[2]).toString() != messageParts[2]) { return false }
                        let newScore = parseInt(messageParts[2])

                        //  Success, write the new data
                        this.elements.PlayerScores[playerLowercase] = newScore
                        this.elements.PlayerScoreLabels[playerLowercase].setValue(this.elements.PlayerScores[playerLowercase])
                    }
                    break;

                case "!upscore":
                    {
                        //  Proper form is "!setscore USERNAME SCORE"
                        if (messageParts.length !== 2) { return false }
                        
                        //  If the second part is not a valid player, fail out
                        let playerLowercase = messageParts[1].toLowerCase()
                        if (!playersLowerCase.includes(playerLowercase)) { return false }

                        //  Success, write the new data
                        this.elements.PlayerScores[playerLowercase] = this.elements.PlayerScores[playerLowercase] + 1;
                        this.elements.PlayerScoreLabels[playerLowercase].setValue(this.elements.PlayerScores[playerLowercase])
                    }
                    break;

                    case "!downscore":
                        {
                            //  Proper form is "!setscore USERNAME SCORE"
                            if (messageParts.length !== 2) { return false }
                            
                            //  If the second part is not a valid player, fail out
                            let playerLowercase = messageParts[1].toLowerCase()
                            if (!playersLowerCase.includes(playerLowercase)) { return false }
    
                            //  Success, write the new data
                            this.elements.PlayerScores[playerLowercase] = this.elements.PlayerScores[playerLowercase] - 1;
                            this.elements.PlayerScoreLabels[playerLowercase].setValue(this.elements.PlayerScores[playerLowercase])
                        }
                        break;


                default: return false
            }

            //  If the command is accepted by the Control Screen and processed successfully, we're done here
            //if (await this.elements.SoundActivityScreen.processMessage(message)) { return true; };
        });
    }
}