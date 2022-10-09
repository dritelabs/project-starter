{{- define "drite.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "drite.fullname" . }}
  labels:
    {{- include "drite.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: 80
      protocol: TCP
      name: http
  selector:
    {{- include "drite.selectorLabels" . | nindent 4 }}
{{- end}}
