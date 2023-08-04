package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/pubsub"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func main() {
	http.HandleFunc("/ws", websocketHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func websocketHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error al actualizar la conexión:", err)
		return
	}
	defer conn.Close()

	//ctx := r.Context()

	// Crea un cliente de Google Cloud Pub/Sub
	/*client, err := pubsub.NewClient(ctx, "is-tech-academy")
	if err != nil {
		log.Println("Error al crear el cliente de Pub/Sub:", err)
		return
	}*/

	subscriberOrder := os.Getenv("SUBS_ORDER")
	subscriberCustomer := os.Getenv("SUBS_CUSTOMER")

	// Suscríbete a los tópicos de Pub/Sub
	//subOrder := client.Subscription(subscriberOrder)
	//subCustomer := client.Subscription(subscriberCustomer)

	// Crea un contexto y cliente para la suscripción de órdenes
	ctxOrder := context.Background()
	clientOrder, err := pubsub.NewClient(ctxOrder, "is-tech-academy")
	if err != nil {
		log.Println("Error al crear el cliente de Pub/Sub para órdenes:", err)
		return
	}
	defer clientOrder.Close()

	subOrder := clientOrder.Subscription(subscriberOrder)
	log.Printf("Creado el suscriptor %s", subscriberOrder)

	err = subOrder.Receive(ctxOrder, func(ctx context.Context, msg *pubsub.Message) {
		log.Printf("Mensaje obtenido del subscriber %s: %s", subscriberOrder, msg.Data)
		// Envía el mensaje a través del WebSocket
		if conn != nil {
			err := conn.WriteMessage(websocket.TextMessage, msg.Data)
			log.Println("Error al enviar mensaje a través del WebSocket1:", err)
			msg.Nack()
			return
		}
		log.Println("Mensaje enviado a través del WebSocket1:")
		msg.Ack()
	})
	if err != nil {
		log.Printf("Error al recibir mensajes de subscriber %s: %s", subscriberOrder, err)
		return
	}

	// Crea un contexto y cliente para la suscripción de clientes
	ctxCustomer := context.Background()
	clientCustomer, err := pubsub.NewClient(ctxCustomer, "is-tech-academy")
	if err != nil {
		log.Println("Error al crear el cliente de Pub/Sub para clientes:", err)
		return
	}
	defer clientCustomer.Close()

	subCustomer := clientCustomer.Subscription(subscriberCustomer)
	log.Printf("Creado el suscriptor %s", subscriberCustomer)

	err = subCustomer.Receive(ctxCustomer, func(ctx context.Context, msg *pubsub.Message) {
		log.Printf("Mensaje obtenido del subscriber %s: %s", subscriberCustomer, msg.Data)
		// Envía el mensaje a través del WebSocket
		if conn != nil {
			err := conn.WriteMessage(websocket.TextMessage, msg.Data)
			log.Println("Error al enviar mensaje a través del WebSocket2:", err)
			msg.Nack()
			return
		}
		log.Println("Mensaje enviado a través del WebSocket2:")
		msg.Ack()
	})
	if err != nil {
		log.Printf("Error al recibir mensajes de subscriber %s: %s", subscriberCustomer, err)
		return
	}

	// Mantén la conexión WebSocket abierta
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error al leer mensaje del WebSocket:", err)
			break
		}
	}
}
