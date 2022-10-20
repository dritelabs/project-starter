protoc -I ../proto --go_out=. --go_opt=module=github.com/dritelabs/project-starter \
    --go-grpc_out=. --go-grpc_opt=module=github.com/dritelabs/project-starter \
    ../proto/project-starter.proto
