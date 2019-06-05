C:\DATA\Apps\aws\lambda\LambdaNodeDemo\LambdaCode

mkdir repository-service npm init -y

Instala libreria para datetime npm install moment --save

Crear index.js

Comprimir zip (seleccionar todos los elementos dentro del directorio) Crear Lambda nuevo de cero

Tipo de entrada de código: Cargar un archivo zip Tiempo de ejecución: Node.js 10.x Controlador: index.handler

Selecciona el zip Guardar

********************************************************************************
********************************************************************************



********************************************************************************
********************************************************************************











Se crea manualmente el rol CloudFormationServiceRole
Se crea manualmente el rol MyLambdaRole  (Permisos LambdaManualPolicy, ApiGatewayManualPolicy)
Se crea automaticamente en el stage build el rol codebuild-LambdaDemoPhyton-service-role

Se crea automaticamente al crear el CodePipeline
(Aqui crea Rol AWSCodePipelineServiceRole-us-east-1-LambdaPhytonPipeline)


Crear Role ==> Selecciona CloudFormation ==> Filtrar AwsLambdaExecute
Siguiente
Nombre de Rol: CloudFormationServiceRole
Politica:  AwsLambdaExecute

El archivo CFnServiceRole.json esta personalizado
Cambiar su region y su account ID

Ejemplos:
Mi región y account ID
arn:aws:iam::771861526154:user/awsUser
arn:aws:lambda:us-east-1:771861526154:function:functionV1

Luego de reeemplazar copiar el contenido de CFnServiceRole.json
Entrar al Rol CloudFormationServiceRole
Click en Añadir una política insertada
Y copiar el contenido del archivo dentro de la pestaña JSON

CLick en revisar la politica
Nombre de Politica: CFNLambdaPolicy
Guardar


EN AWS IR A CodePipeline
Pipeline Name: FxLambdaPhytonPipeline
Por default
New service Role  
(Aqui crea Rol por default name:
AWSCodePipelineServiceRole-us-east-1-LambdaPhytonPipeline)
Default S3 location

Source provider: GitHub
Conectar y seleccionar repository y branch

Add build stage
Build provider:  AWS CodeBuild

Project name: Create Project
Project name: LambdaDemoPhyton
Enviroment image:  Managed image
Operating system:  Ubuntu
Runtime: Standard
Image:  aws/codebuild/standard:1.0
Image versión:  aws/codebuild/standard:1.0-1.8.0
Check new service role
(Aqui se genero un Rol codebuild-LambdaDemoPhyton-service-role)
Check use a buildspec file
Next
------------------------AQUI EDITAR ROLE
Al Rol codebuild-LambdaDemoPhyton-service-role
Añadir una política insertada
En la pestaña editor visual
Click en elegir servicio:  S3
Click en Acciones:  Escribir / Put Object
CLick en Recursos: marcar Todos los recursos

Click en revisar la politica
Nombre: codebuildS3Policy
Click en crear politica

------------------------
Add deploy stage
Deploy provider:  AWS CloudFormation
Region:  US East Virginia

Action mode: Create or replace a change set
Stack name: LambdaDemoPhytonStack
Change set name: LambdaDemoPhytonSN
Template:  BuildArtifact::outputSamTemplate.yaml

arn:aws:s3:::misrecursos/outputSamTemplate.yaml  (template de salida)

Capabilities - optional:   CAPABILITY_IAM
Role name:  CloudFormationServiceRole

REFERENCIAS:
https://www.youtube.com/watch?v=aGI4Wlm5c9U

https://docs.aws.amazon.com/es_es/lambda/latest/dg/build-pipeline.html

LUEGO DE VALIDAR EL CORRECTO FUNCIONAMIENTO DE CADA STAGE
CREAR EL QUE HAGA EL DESPLIEGUE REAL

ADD STAGE
Stage name: Deploy

Action name: ExecuteChangeSet
Action provider: AWS CloudFormation

Action mode: Execute a change set
Stack name: LambdaDemoPhytonStack
Change set name: LambdaDemoPhytonSN

"Save cambios"

Otros link
https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html




