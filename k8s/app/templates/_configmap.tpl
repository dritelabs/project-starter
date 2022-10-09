{{- define "drite.configmap.tpl" -}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "drite.fullname" . }}
data: {}
{{- end -}}
{{- define "drite.configmap" -}}
{{- include "drite.util.merge" (append . "drite.configmap.tpl") -}}
{{- end -}}
