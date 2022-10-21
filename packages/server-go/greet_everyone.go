package main

import (
	"io"
	"log"

	pb "github.com/dritelabs/project-starter/proto"
)

func (s *Server) GreetEveryone(stream pb.GreetService_GreetEveryoneServer) error {
	log.Printf("GreetEveryone was invoked")

	for {
		req, err := stream.Recv()

		if err == io.EOF {
			return nil
		}

		if err != nil {
			log.Fatalf("Error while reading client stream %v\n", err)
		}

		if err := stream.Send(&pb.GreetResponse{
			Result: "Hello " + req.FirstName + "",
		}); err != nil {
			log.Fatalf("Error while sending data to client stream %v\n", err)
		}
	}
}
