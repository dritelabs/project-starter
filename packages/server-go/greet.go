package main

import (
	"context"
	"fmt"

	pb "github.com/dritelabs/project-starter/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (s *Server) Greet(ctx context.Context, in *pb.GreetRequest) (*pb.GreetResponse, error) {
	if in.FirstName == "Test" {
		return nil, status.Errorf(
			codes.InvalidArgument,
			fmt.Sprintf("Received a wrong argument: %s", in.FirstName),
		)
	}

	return &pb.GreetResponse{
		Result: "Hello " + in.FirstName,
	}, nil
}
