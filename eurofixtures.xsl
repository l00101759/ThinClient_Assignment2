<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<head>
<script src="../jquery-1.12.1.min.js" type="text/javascript"></script>
<script type="text/javascript" src="fixtures.js"></script>
<title>European Championship</title>
</head>

<body>
Select Country: 
<select id="select">
  <option value="Ireland">Ireland</option>
  <option value="Sweden">Sweden</option>
  <option value="Italy">Italy</option>
  <option value="Belgium">Belgium</option>
</select>
<button type="button">Change Content</button>
<div id="demo"> Test Ajax </div>

<br /><br />
    <!--table -->
    <table width="30%" border="1.5">
    <tr bgcolor="#B4A5A5"><td>Date</td><td>Home</td><td>Away</td></tr>
    <xsl:for-each select="Fixtures/game">
    <xsl:sort select="awayteam" order="ascending" data-type="text"/>
        <tr>
        <td><xsl:value-of select="date"/></td>
        <td><xsl:value-of select="hometeam"/></td>
        <td><xsl:value-of select="awayteam"/></td>
        </tr>
	</xsl:for-each>
    </table>
	
</body>
</html>
</xsl:template>
</xsl:stylesheet>

 <!--Elements 
	<xsl:for-each select="Fixtures/game">
    <xsl:sort select="awayteam" order="ascending" data-type="text"/>
        <b><xsl:value-of select="hometeam"/></b> -
        <xsl:value-of select="date"/> -
        <b><xsl:value-of select="awayteam"/></b>
     	<br />
	</xsl:for-each>

	<br />-->