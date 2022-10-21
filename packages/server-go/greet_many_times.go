package main

import (
	"fmt"
	"log"
	"time"

	pb "github.com/dritelabs/project-starter/proto"
)

func (s *Server) GreetManyTimes(in *pb.GreetRequest, stream pb.GreetService_GreetManyTimesServer) error {
	log.Printf("GreetingManyTimes was invoked with %v\n", in)

	for i := 0; i < 10; i++ {
		res := fmt.Sprintf("Hello %s, number %d", in.FirstName, i)

		time.Sleep(time.Second * 2)

		stream.Send(&pb.GreetResponse{
			Result: res,
		})

	}

	return nil
}
