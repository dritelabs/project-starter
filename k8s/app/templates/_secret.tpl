{{- define "accounts.secret.tpl" -}}
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "accounts.fullname" . }}
type: Opaque
data: {}
{{- end -}}
{{- define "accounts.secret" -}}
{{- include "accounts.util.merge" (append . "accounts.secret.tpl") -}}
{{- end -}}