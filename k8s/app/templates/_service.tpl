{{- define "accounts.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "accounts.fullname" . }}
  labels:
    {{- include "accounts.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: 80
      protocol: TCP
      name: http
  selector:
    {{- include "accounts.selectorLabels" . | nindent 4 }}
{{- end}}