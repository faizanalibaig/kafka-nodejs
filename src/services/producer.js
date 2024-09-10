const { Kafka } = require("kafkajs");
const { Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});

const producer = async () => {
  const kafkaProducer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  try {
    await kafkaProducer.connect();
    console.log("Producer connected to Kafka");

    const topic = "worker-queue";
    const message = {
      value: JSON.stringify({
        message: {
          name: "hello world",
        },
      }),
    };

    await kafkaProducer.send({
      topic,
      messages: [message],
    });

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error in producer:", error);
  } finally {
    await kafkaProducer.disconnect();
    console.log("Producer disconnected");
  }
};

producer().catch((err) => console.log("Error in producer:", err));
