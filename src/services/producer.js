const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "worker-application",
  brokers: ["192.168.1.34:9092"],
});
