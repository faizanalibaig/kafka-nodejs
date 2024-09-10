const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});

const consumer = async () => {
  const kafkaconsumer = kafka.consumer({
    groupId: "worker-1",
  });

  try {
    await kafkaconsumer.connect();
  } catch (error) {
    console.log("error connecting to kafkaconsumer", error);
  }
};

consumer().catch((err) => console.log(err));
