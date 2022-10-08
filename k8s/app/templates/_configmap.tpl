{{- define "accounts.configmap.tpl" -}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "accounts.fullname" . }}
data: {}
{{- end -}}
{{- define "accounts.configmap" -}}
{{- include "accounts.util.merge" (append . "accounts.configmap.tpl") -}}
{{- end -}}