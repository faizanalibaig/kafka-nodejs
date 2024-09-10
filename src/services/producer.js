const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});

const producer = async () => {
  const kafkaproducer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  try {
    await kafkaproducer.connect();

    const topic = "worker-queue";
  } catch (error) {}

  await producer.disconnect();
};

producer().catch((err) => console.log(err));
