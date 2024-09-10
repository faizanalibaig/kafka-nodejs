const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");
const LedgerUser = require("../models/ledgeruser");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});

const mongoUri =
  "mongodb+srv://faizanali:faizanbaig@cluster1.vpjat.mongodb.net/your-database-name";

const consumer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to DB in consumer");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }

  const kafkaConsumer = kafka.consumer({ groupId: "worker-1" });

  try {
    await kafkaConsumer.connect();
    console.log("Connected to Kafka");
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
    await mongoose.disconnect();
    process.exit(1);
  }

  try {
    await kafkaConsumer.subscribe({
      topic: "worker-queue",
      fromBeginning: true,
    });
    console.log("Subscribed to topic: worker-queue");
  } catch (error) {
    console.error("Error subscribing to Kafka topic:", error);
    await kafkaConsumer.disconnect();
    await mongoose.disconnect();
    process.exit(1);
  }

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log(`Received data: ${JSON.stringify(data)}`);

        const result = await LedgerUser.updateMany(
          {},
          { $set: { name: "babar" } }
        );
        console.log("Update result:", result);

        // if (data.message && data.message.name) {
        //   const result = await LedgerUser.create({
        //     name: data.message.name,
        //   });
        //   console.log("New ledger user created:", result);
        // }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
};

consumer().catch((err) => console.error("Error in consumer:", err));
