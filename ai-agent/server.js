const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Example: AI agent fetches on-chain data via GraphQL and computes a simple reputation score.
app.post('/compute-reputation', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        // GraphQL query: Retrieve the user's on-chain token ownership data.
        const graphqlQuery = {
            query: `
              query GetUserData($owner: String!) {
                current_token_ownerships_v2(
                  where: {
                    owner_address: {_eq: $owner},
                    amount: {_gt: 0}
                  }
                ) {
                  amount
                }
              }
            `,
            variables: { owner: walletAddress }
        };

        const response = await axios.post(
            'https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql',
            graphqlQuery
        );

        // Simple reputation calculation: Sum of token amounts.
        let reputation = 0;
        if (response.data.data.current_token_ownerships_v2) {
            reputation = response.data.data.current_token_ownerships_v2.reduce((sum, item) => {
                return sum + parseInt(item.amount);
            }, 0);
        }

        // AI recommendation based on the reputation score.
        let recommendation = "";
        if (reputation < 1000) {
            recommendation = "Increase your on-chain activity to boost your reputation.";
        } else {
            recommendation = "Great job! Your on-chain reputation is strong.";
        }

        res.json({ reputation, recommendation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to compute reputation." });
    }
});

app.listen(port, () => {
    console.log(`AI Agent server is running on port ${port}`);
});
