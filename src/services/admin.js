const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});

async function admin() {
  const admin = kafka.admin();
  await admin.connect();

  try {
    await admin.createTopics({
      topics: [
        {
          topic: "worker-queue",
          numPartitions: 2,
        },
      ],
    });

    console.log("topic created successfully");
  } catch (error) {
    console.log(`Error creating topic: ${error.message}`);
  }

  await admin.disconnect();
}

admin();
