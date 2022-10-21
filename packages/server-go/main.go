package main

import (
	"log"
	"net"
	"os"

	pb "github.com/dritelabs/project-starter/proto"
	"google.golang.org/grpc"
)

var addr string = "0.0.0.0:50051"

type Server struct {
	pb.GreetServiceServer
}

func main() {
	if _, bol := os.LookupEnv("HOST"); !bol {
		os.Setenv("HOST", addr)
	}

	addr = os.Getenv("HOST")

	lis, err := net.Listen("tcp", addr)

	if err != nil {
		log.Fatalf("Failed to listen on: %v\n", addr)
	}

	log.Printf("Listening on %s\n", addr)

	s := grpc.NewServer()

	pb.RegisterGreetServiceServer(s, &Server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve %v\n", err)
	}
}
