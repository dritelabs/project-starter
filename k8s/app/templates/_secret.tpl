{{- define "drite.secret.tpl" -}}
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "drite.fullname" . }}
type: Opaque
data: {}
{{- end -}}
{{- define "drite.secret" -}}
{{- include "drite.util.merge" (append . "drite.secret.tpl") -}}
{{- end -}}
