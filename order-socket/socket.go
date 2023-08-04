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

var subOrder *pubsub.Subscription
var ctxOrder context.Context

func main() {
	// Crea un suscriptor
	// Crea un contexto y cliente para la suscripción de órdenes
	subscriberOrder := os.Getenv("SUBS_ORDER")
	//subscriberCustomer := os.Getenv("SUBS_CUSTOMER")
	ctxOrder = context.Background()
	clientOrder, err := pubsub.NewClient(ctxOrder, "is-tech-academy")
	if err != nil {
		log.Println("Error al crear el cliente de Pub/Sub para órdenes:", err)
		return
	}
	defer clientOrder.Close()

	subOrder = clientOrder.Subscription(subscriberOrder)
	log.Printf("Creado el suscriptor %s", subscriberOrder)

	// Crea un WebSocket server
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

	// Envía mensajes al WebSocket
	for {
		err := subOrder.Receive(ctxOrder, func(ctx context.Context, msg *pubsub.Message) {
			log.Printf("Mensaje obtenido del subscriber SUBS_ORDER: %s", msg.Data)
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
			log.Println("Error al recibir mensaje del tema:", err)
			break
		}
	}
}
